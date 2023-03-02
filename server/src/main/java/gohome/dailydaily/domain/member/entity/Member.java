package gohome.dailydaily.domain.member.entity;

import gohome.dailydaily.domain.cart.entity.Cart;
import gohome.dailydaily.domain.file.entity.File;
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
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private File img;

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

    public void addRoles(MemberRole... memberRoles) {
        roles.addAll(List.of(memberRoles));
    }
    public void addRoles(List<MemberRole> memberRoles) {
        roles.addAll(memberRoles);
    }

    @OneToOne(mappedBy = "member", cascade = CascadeType.PERSIST)
    private Cart cart;

    @OneToMany(mappedBy = "member")
    private final List<Review> reviews = new ArrayList<>();

    public void initInfo(String encodedPassword) {
        this.password = encodedPassword;
        this.memberStatus = MemberStatus.ACTIVE;
        this.cart = Cart.builder().member(this).build();
    }

    public void updateInfo(Member member, String password) {
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> this.nickname = nickname);
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

    public void updateImg(File file) {
        this.img = file;
    }

}
