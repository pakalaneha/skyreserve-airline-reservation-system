package com.ars.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ars.entity.Wallet;

@Repository
public interface WalletRepo extends JpaRepository<Wallet, Integer> {

    Optional<Wallet> findByUserUserId(Integer userId);
}