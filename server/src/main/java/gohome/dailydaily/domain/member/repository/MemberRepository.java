package gohome.dailydaily.domain.member.repository;

import gohome.dailydaily.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}
