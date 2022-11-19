package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByMainAndSub(String main, String sub);
}
