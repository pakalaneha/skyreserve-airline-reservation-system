package com.ars.service;

import com.ars.entity.Wallet;

public interface WalletService {

    Wallet getWalletByUserId(Integer userId);

    Wallet addBalance(Integer userId, Double amount);

    Wallet deductBalance(Integer userId, Double amount);
}