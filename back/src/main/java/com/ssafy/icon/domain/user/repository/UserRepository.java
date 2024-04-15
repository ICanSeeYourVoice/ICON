package com.ssafy.icon.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.icon.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
}
