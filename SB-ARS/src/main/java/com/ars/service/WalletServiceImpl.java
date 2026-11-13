package com.ars.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ars.entity.User;
import com.ars.entity.Wallet;
import com.ars.message.ApplicationMessages;
import com.ars.repo.UserRepo;
import com.ars.repo.WalletRepo;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepo walletRepo;

    @Autowired
    private ApplicationMessages messages;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Wallet getWalletByUserId(Integer userId) {
        return walletRepo.findByUserUserId(userId).orElseGet(() -> {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException(
                            messages.get("app.message.wallet.user-not-found-id", userId)));
            Wallet newWallet = new Wallet();
            newWallet.setUser(user);
            newWallet.setBalance(0.0);
            return walletRepo.save(newWallet);
        });
    }

    @Override
    public Wallet addBalance(Integer userId, Double amount) {
        if (amount <= 0) {
            throw new RuntimeException(messages.get("app.message.wallet.amount-must-be-positive"));
        }
        Wallet wallet = getWalletByUserId(userId);
        wallet.setBalance(wallet.getBalance() + amount);
        return walletRepo.save(wallet);
    }

    @Override
    public Wallet deductBalance(Integer userId, Double amount) {
        Wallet wallet = getWalletByUserId(userId);
        if (wallet.getBalance() < amount) {
            throw new RuntimeException(
                    messages.get("app.message.wallet.insufficient-balance", wallet.getBalance()));
        }
        wallet.setBalance(wallet.getBalance() - amount);
        return walletRepo.save(wallet);
    }
}