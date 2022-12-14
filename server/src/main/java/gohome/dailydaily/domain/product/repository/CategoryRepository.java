package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {


    @Query(value = "select c.id from Category c where c.main=:main and c.sub =:sub")
    Long findIdByMainAndSub(@Param("main") String main, @Param("sub") String sub);

    @Query(value = "select c from Category c group by c.main")
    List<Category> findByGroupByMain();
}
