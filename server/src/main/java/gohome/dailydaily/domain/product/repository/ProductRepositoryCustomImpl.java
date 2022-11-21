package gohome.dailydaily.domain.product.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.OptionDto;
import gohome.dailydaily.domain.product.dto.QCategoryGetDto;
import gohome.dailydaily.domain.product.dto.QOptionDto_Response;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.entity.QCategory;
import gohome.dailydaily.domain.product.entity.QProduct;
import gohome.dailydaily.domain.product.repository.param.CategoryGetParam;
import gohome.dailydaily.domain.product.repository.param.TitleGetParam;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.global.error.BusinessLogicException;
import gohome.dailydaily.global.error.ExceptionCode;
import gohome.dailydaily.global.util.Querydsl4RepositorySupport;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static gohome.dailydaily.domain.like.entity.QLike.like;
import static gohome.dailydaily.domain.member.entity.QSeller.seller;
import static gohome.dailydaily.domain.product.entity.QCategory.category;
import static gohome.dailydaily.domain.product.entity.QOption.option;
import static gohome.dailydaily.domain.product.entity.QProduct.product;
import static java.lang.Long.sum;
import static org.springframework.util.StringUtils.hasText;

@Repository
public class ProductRepositoryCustomImpl extends Querydsl4RepositorySupport implements ProductRepositoryCustom {

    public ProductRepositoryCustomImpl() {
        super(Product.class);
    }


    @Override
    public List<CategoryGetDto> findTop5ByScore() {
        List<CategoryGetDto> content = select(getCategoryGetDto())
                .from(product)
                .orderBy(product.score.desc(),product.reviews.size().desc())
                .limit(5)
                .fetch();

        if (content.size() < 1){
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }

        return content;
    }

    @Override
    public List<CategoryGetDto> findByTop5ByBrand(Long id) {

        List<CategoryGetDto> content = select(getCategoryGetDto())
                .from(product)
                .orderBy(product.score.desc(), product.reviews.size().desc())
                .innerJoin(product.seller, seller)
                .where(product.seller.id.eq(id))
                .limit(5)
                .fetch();

        if (content.size() < 1){
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        return content;
    }

    @Override
    public List<CategoryGetDto> findByTop15ByCategory(String main) {
        List<CategoryGetDto> content = select(getCategoryGetDto())
                .from(product)
                .orderBy(product.createdAt.asc())
                .innerJoin(product.category, category)
                .where(product.category.main.eq(main))
                .limit(15)
                .fetch();

        if (content.size() < 1){
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }
        return content;
    }

    @Override
    public SliceResponseDto<CategoryGetDto> findAllByTitle(Pageable pageable, TitleGetParam param) {
        BooleanBuilder whereCondition = getWhereCondition(param);

        Slice<CategoryGetDto> content = applySlicing(pageable, query ->
                query.select(getCategoryGetDto())
                        .from(product)
                        .where(whereCondition)
                        .orderBy(product.score.desc(), product.id.asc()));

        return SliceResponseDto.of(content);
    }

    @Override
    public SliceResponseDto<CategoryGetDto> findAllByCategory(Pageable pageable, CategoryGetParam param) {

        BooleanBuilder whereCondition = getWhereCondition(param);

        Slice<CategoryGetDto> content = applySlicing(pageable, query ->
                query.select(getCategoryGetDto())
                        .from(product)
                        .innerJoin(product.category, category)
                        .where(whereCondition)
                        .orderBy(product.score.desc(), product.id.asc())); // 일단 평점 내림차순으로 정렬하는 걸로 해둠

        return SliceResponseDto.of(content);
//        return  SliceResponseDto.of(
//                content.map(p -> {
//                    p.setOptions(findByProduct(p.getId()));
//                    return p;
//                }));
    }



//    @Override
//    public List<OptionDto.Response> findByProduct(Long id) {
//        return select(getOptionDtoResponse())
//                .from(option)
//                .innerJoin(option.product, product)
//                .where(product.id.eq(id))
//                .orderBy(option.id.asc())
//                .fetch();
//    }

//    @Override // transactional이 이미 service에 있기 때문에 필요없음
//    public Slice<CategoryGetDto> findByCategory_Main(Pageable pageable, String main) {
//        List<Product> result = query
//                .selectFrom(product)
//                .where(product.category.main.eq(main))
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize() + 1)
//                .fetch();
//
//        List<CategoryGetDto> content = result.stream().map(p ->
//                        new CategoryGetDto(p.getId(), p.getImg(), p.getTitle(), p.getPrice(),
//                                p.getScore()))
//                .collect(Collectors.toList());
//
//        boolean hasNext = false;
//        if (content.size() > pageable.getPageSize()) {
//            content.remove(pageable.getPageSize());
//            hasNext = true;
//        }
//        return new SliceImpl<>(content, pageable, hasNext);
//    }

    private QCategoryGetDto getCategoryGetDto() {
        return new QCategoryGetDto(
            product.id,
            product.img,
            product.title,
            product.price,
            product.score
        );
    }

    private QOptionDto_Response getOptionDtoResponse() {
        return new QOptionDto_Response(
                option.id,
                option.color,
                option.size,
                option.price,
                option.stock);
    }

//    @Override
//    public Slice<CategoryGetDto> findByCategory_MainAndCategory_Sub(Pageable pageable, String main, String sub) {
//        List<Product> result = query
//                .selectFrom(product)
//                .where(product.category.main.eq(main),
//                        product.category.sub.eq(sub))
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize() + 1)
//                .fetch();
//
//        List<CategoryGetDto> content = result.stream().map(p ->
//                        new CategoryGetDto(p.getId(), p.getImg(), p.getTitle(), p.getPrice(), p.getScore()))
//                .collect(Collectors.toList());
//
//        boolean hasNext = false;
//        if (content.size() > pageable.getPageSize()) {
//            content.remove(pageable.getPageSize());
//            hasNext = true;
//        }
//        return new SliceImpl<>(content, pageable, hasNext);
//    }


    // 조건문 -> 동적 할당
    private BooleanBuilder getWhereCondition(CategoryGetParam param) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        if (hasText(param.getMainCategory())) {
            whereCondition.and(category.main.eq(param.getMainCategory()));
        }

        if (hasText(param.getSubCategory())) {
            whereCondition.and(category.sub.eq(param.getSubCategory()));
        }

        return whereCondition;
    }

    private BooleanBuilder getWhereCondition(TitleGetParam param) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        if (hasText(param.getTitle())) {
            whereCondition.and(product.title.contains(param.getTitle()));
        }

        return whereCondition;
    }
}
