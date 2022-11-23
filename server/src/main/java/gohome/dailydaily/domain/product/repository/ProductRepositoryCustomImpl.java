package gohome.dailydaily.domain.product.repository;

import com.querydsl.core.BooleanBuilder;
import gohome.dailydaily.domain.product.dto.CategoryGetDto;
import gohome.dailydaily.domain.product.dto.QCategoryGetDto;
import gohome.dailydaily.domain.product.dto.QOptionDto_Response;
import gohome.dailydaily.domain.product.entity.Product;
import gohome.dailydaily.domain.product.repository.param.CategoryGetParam;
import gohome.dailydaily.domain.product.repository.param.TitleGetParam;
import gohome.dailydaily.global.common.dto.SliceResponseDto;
import gohome.dailydaily.global.util.Querydsl4RepositorySupport;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;
import java.util.List;
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
                .limit(5)
                .fetch();

        return content;
    }

    @Override
    public List<CategoryGetDto> findByTop15ByBrand(Long id) {

        List<CategoryGetDto> content = select(getCategoryGetDto())
                .from(product)
                .orderBy(product.score.desc(), product.reviews.size().desc())
                .innerJoin(product.seller)
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

    private QOptionDto_Response getOptionDtoResponse() {
        return new QOptionDto_Response(
                option.id,
                option.color,
                option.size,
                option.price,
                option.stock);
    }

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
