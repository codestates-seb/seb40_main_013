package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByMainAndSub(String main, String sub);

    @Query(value = "select c from Category c group by c.main")
    List<Category> findByGroupByMain();
}
