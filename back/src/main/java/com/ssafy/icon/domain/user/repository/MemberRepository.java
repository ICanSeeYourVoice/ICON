package com.ssafy.icon.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.icon.domain.user.entity.Member;

public interface MemberRepository extends JpaRepository<Member,Long> {
}
