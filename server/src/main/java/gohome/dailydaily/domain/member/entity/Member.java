package gohome.dailydaily.domain.member.entity;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.review.entity.Review;
import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    private String address;
    private String phone;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<MemberRole> roles;

    @OneToOne(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Cart cart;

    @OneToMany(mappedBy = "member")
    private List<Review> reviews;

}
