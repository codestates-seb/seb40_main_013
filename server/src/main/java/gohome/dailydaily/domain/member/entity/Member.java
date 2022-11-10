package gohome.dailydaily.domain.member.entity;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.review.entity.Review;
import gohome.dailydaily.global.common.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String password;

    private String address;
    private String phone;

    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private final List<MemberRole> roles = new ArrayList<>();

    public void addRoles(MemberRole ... memberRoles) {
        roles.addAll(List.of(memberRoles));
    }

    @OneToOne(mappedBy = "member", cascade = CascadeType.PERSIST)
    private Cart cart;

    @OneToMany(mappedBy = "member")
    private final List<Review> reviews = new ArrayList<>();

    public void initInfo(String encodedPassword) {
        this.password = encodedPassword;
        memberStatus = MemberStatus.ACTIVE;
    }

    public void updateInfo(Member member, String password) {
        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> this.email = email);
        Optional.ofNullable(member.getAddress())
                .ifPresent(address -> this.address = address);
        Optional.ofNullable(member.getPhone())
                .ifPresent(phone -> this.phone = phone);
        Optional.ofNullable(password)
                .ifPresent(pw -> this.password = pw);
    }

    public void updateStatus(MemberStatus memberStatus) {
        this.memberStatus = memberStatus;
    }

}
