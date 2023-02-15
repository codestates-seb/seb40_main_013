package gohome.dailydaily.domain.member.repository;

import gohome.dailydaily.domain.member.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {
}
