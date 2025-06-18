// Bu dosya, lib.rs'dir. Projenizin ana sözleşme kodunu içerir.
#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol, Vec, I128};

// --- Sözleşme Veri Tipleri ---

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Tip {
    pub tipper: Address,
    pub amount: i128,
}

#[contracttype]
pub enum DataKey {
    Benefactor, // Bahşişleri alacak olan ana hesap
    Tips,       // Gönderilen tüm bahşişlerin listesi
}


// --- Sözleşme ---

#[contract]
pub struct TipJarContract;


#[contractimpl]
impl TipJarContract {
    /// Sözleşmeyi başlatan fonksiyon. Yalnızca bir kez çağrılabilir.
    /// `benefactor`: Bahşişlerin gönderileceği Stellar adresi.
    pub fn initialize(env: Env, benefactor: Address) {
        // Zaten başlatılıp başlatılmadığını kontrol et
        if env.storage().instance().has(&DataKey::Benefactor) {
            panic!("Sözleşme zaten başlatılmış");
        }
        // Bahşiş alacak kişiyi kaydet
        env.storage().instance().set(&DataKey::Benefactor, &benefactor);
        // Boş bir bahşiş listesi oluştur
        env.storage().instance().set(&DataKey::Tips, &Vec::<Tip>::new(&env));
    }

    /// Bahşiş göndermek için kullanılan ana fonksiyon.
    /// `tipper`: Bahşişi gönderen kişinin adresi (otomatik olarak yetkilendirilir).
    /// `amount`: Gönderilen bahşiş miktarı (stroop cinsinden, 1 XLM = 10,000,000 stroop).
    pub fn tip(env: Env, tipper: Address, amount: i128) {
        // Fonksiyonu çağıran kişinin işlemi imzaladığını doğrula
        tipper.require_auth();

        // Miktarın pozitif olduğundan emin ol
        if amount <= 0 {
            panic!("Bahşiş miktarı pozitif olmalı");
        }

        // Kayıtlı bahşiş alıcı adresini al
        let benefactor: Address = env.storage().instance().get(&DataKey::Benefactor).unwrap();

        // --- ÖNEMLİ NOT ---
        // Bu basit örnekte, sözleşme sadece bir kayıt tutar.
        // Gerçek XLM transferi, frontend'den gönderilen işlemin bir parçası olmalıdır.
        // Frontend, aynı anda hem `payment` işlemi (tipper -> benefactor) hem de
        // `invoke_contract` işlemi (bu fonksiyonu çağırma) içermelidir.
        // Bu, atomik bir işlem sağlar: ya her ikisi de olur ya da hiçbiri.
        // Alternatif olarak, sözleşme fonları kendi içinde tutup bir `withdraw` fonksiyonu sunabilir.

        // Yeni bahşişi oluştur
        let new_tip = Tip {
            tipper,
            amount,
        };

        // Bahşişi listeye ekle
        let mut tips: Vec<Tip> = env.storage().instance().get(&DataKey::Tips).unwrap();
        tips.push_back(new_tip);
        env.storage().instance().set(&DataKey::Tips, &tips);

        // Bir olay (event) yayınla
        env.events().publish(
            (symbol_short!("tip"), benefactor),
            amount
        );
    }
    
    // --- Sadece Okuma Fonksiyonları ---

    /// Kayıtlı tüm bahşişleri döndürür.
    pub fn get_tips(env: Env) -> Vec<Tip> {
        env.storage().instance().get(&DataKey::Tips).unwrap_or_else(|| Vec::new(&env))
    }

    /// Bahşiş alıcısının adresini döndürür.
    pub fn get_benefactor(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Benefactor).unwrap()
    }
}

// Sözleşme testleri için modül
#[cfg(test)]
mod test;
