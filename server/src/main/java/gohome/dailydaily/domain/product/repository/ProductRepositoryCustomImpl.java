package gohome.dailydaily.domain.product.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.entity.QProduct;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    QProduct product= QProduct.product;

    public ProductRepositoryCustomImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    @Transactional(readOnly = true)
    public Slice<CategoryGetDto> findByCategory_Main(Pageable pageable, String main) {
        List<Product> result = queryFactory
                .selectFrom(product)
                .where(product.category.main.eq(main))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        List<CategoryGetDto> content = new ArrayList<>();
        for(Product product: result){
            content.add(new CategoryGetDto(product.getId(),product.getTitle(), product.getPrice(), product.getScore()));
        }
        boolean hasNext =false;
        if(content.size() > pageable.getPageSize()){
            content.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(content,pageable,hasNext);
    }

    @Override
    @Transactional(readOnly = true)
    public Slice<CategoryGetDto> findByCategory_MainAndCategory_Sub(Pageable pageable, String main, String sub) {
        List<Product> result = queryFactory
                .selectFrom(product)
                .where(product.category.main.eq(main),
                        product.category.sub.eq(sub))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        List<CategoryGetDto> content = new ArrayList<>();
        for(Product product: result){
            content.add(new CategoryGetDto(product.getId(),product.getTitle(), product.getPrice(), product.getScore()));
        }
        boolean hasNext =false;
        if(content.size() > pageable.getPageSize()){
            content.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(content,pageable,hasNext);
    }
}
