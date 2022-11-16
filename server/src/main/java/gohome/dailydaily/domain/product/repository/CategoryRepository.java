package gohome.dailydaily.domain.product.repository;

import gohome.dailydaily.domain.product.dto.CategoryDto;
import gohome.dailydaily.domain.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByMainAndSub(String main, String sub);
}
