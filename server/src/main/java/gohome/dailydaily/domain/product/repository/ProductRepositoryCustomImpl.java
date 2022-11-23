package gohome.dailydaily.domain.product.repository;

import com.querydsl.core.BooleanBuilder;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.QCategoryGetDto;
import gohome.dailydaily.domain.product.dto.QOptionDto_Response;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.repository.param.BrandGetParam;
import gohome.dailydaily.domain.product.repository.param.CategoryGetParam;
import gohome.dailydaily.domain.product.repository.param.TitleGetParam;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.global.util.Querydsl4RepositorySupport;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;
import java.util.List;

import static gohome.dailydaily.domain.member.entity.QMember.member;
import static gohome.dailydaily.domain.member.entity.QSeller.seller;
import static gohome.dailydaily.domain.product.entity.QCategory.category;
import static gohome.dailydaily.domain.product.entity.QOption.option;
import static gohome.dailydaily.domain.product.entity.QProduct.product;
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
                .innerJoin(product.seller.member, member)
                .innerJoin(product.category, category)
                .limit(5)
                .fetch();

        return content;
    }

    @Override
    public List<CategoryGetDto> findByTop15ByBrand(Long id) {

        List<CategoryGetDto> content = select(getCategoryGetDto())
                .from(product)
                .orderBy(product.score.desc(), product.reviews.size().desc())
                .innerJoin(product.seller.member, member)
                .innerJoin(product.category, category)
                .where(product.seller.id.eq(id))
                .limit(15)
                .fetch();

        return content;
    }

    @Override
    public List<CategoryGetDto> findByTop5ByCategory(String main) {
        List<CategoryGetDto> content = select(getCategoryGetDto())
                .from(product)
                .orderBy(product.createdAt.asc())
                .innerJoin(product.seller.member, member)
                .innerJoin(product.category, category)
                .where(product.category.main.eq(main))
                .limit(5)
                .fetch();

        return content;
    }

    @Override
    public SliceResponseDto<CategoryGetDto> findAllByTitle(Pageable pageable, TitleGetParam param) {
        BooleanBuilder whereCondition = getWhereCondition(param);

        Slice<CategoryGetDto> content = applySlicing(pageable, query ->
                query.select(getCategoryGetDto())
                        .from(product)
                        .where(whereCondition)
                        .innerJoin(product.seller.member, member)
                        .innerJoin(product.category, category)
                        .orderBy(product.score.desc(), product.id.asc()));

        return SliceResponseDto.of(content);
    }

    @Override
    public SliceResponseDto<CategoryGetDto> findAllByBrand(Pageable pageable, BrandGetParam param) {
        BooleanBuilder whereCondition = getWhereCondition(param);

        Slice<CategoryGetDto> content = applySlicing(pageable, query ->
                query.select(getCategoryGetDto())
                        .from(product)
                        .innerJoin(product.seller.member, member)
                        .innerJoin(product.category, category)
                        .where(whereCondition));

        return SliceResponseDto.of(content);
    }

    @Override
    public SliceResponseDto<CategoryGetDto> findAllByCategory(Pageable pageable, CategoryGetParam param) {

        BooleanBuilder whereCondition = getWhereCondition(param);

        Slice<CategoryGetDto> content = applySlicing(pageable, query ->
                query.select(getCategoryGetDto())
                        .from(product)
                        .innerJoin(product.seller.member, member)
                        .innerJoin(product.category, category)
                        .where(whereCondition));

        return SliceResponseDto.of(content);
    }

    private QCategoryGetDto getCategoryGetDto() {
        return new QCategoryGetDto(
            product.id,
            product.img,
            product.title,
            product.price,
            product.score,
            product.seller.member.nickname,
            product.category.main
        );
    }

//    private QOptionDto_Response getOptionDtoResponse() {
//        return new QOptionDto_Response(
//                option.id,
//                option.color,
//                option.stock);
//    }

    // 조건문 -> 동적 할당
//        private BooleanBuilder getWhereCondition(ProductGetParam param) {
//        BooleanBuilder whereCondition = new BooleanBuilder();
//
//        if (hasText(param.getMainCategory())) {
//            whereCondition.and(category.main.eq(param.getMainCategory()));
//        }
//
//        if (hasText(param.getSubCategory())) {
//            whereCondition.and(category.sub.eq(param.getSubCategory()));
//        }
//
//        if (hasText(param.getTitle())) {
//            whereCondition.and(product.title.contains(param.getTitle()));
//        }
//
//        if (param.getSellerId() > 0) {
//            whereCondition.and(product.seller.id.eq(param.getSellerId()));
//        }
//        return whereCondition;
//    }

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

    private BooleanBuilder getWhereCondition(BrandGetParam param) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        if (param.getSellerId() > 0) {
            whereCondition.and(product.seller.id.eq(param.getSellerId()));
        }

        return whereCondition;
    }
}
