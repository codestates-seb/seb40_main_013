package gohome.dailydaily.global.common.security.util;

import gohome.dailydaily.domain.member.entity.Member;
import gohome.dailydaily.domain.member.entity.MemberRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Component
public class JwtTokenizer {

    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String getAccessToken(Member member) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("roles", member.getRoles());

        String subject = String.valueOf(member.getId());
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());
        String bases64EncodedSecretKey = encodedBase64SecretKey(getSecretKey());

        return generateAccessToken(claims, subject, expiration, bases64EncodedSecretKey);
    }

    public String getAccessToken(Long memberId) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("roles", List.of(MemberRole.USER));

        String subject = String.valueOf(memberId);
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());
        String bases64EncodedSecretKey = encodedBase64SecretKey(getSecretKey());

        return generateAccessToken(claims, subject, expiration, bases64EncodedSecretKey);
    }

    public String getRefreshToken(Long memberId) {
        String subject = String.valueOf(memberId);
        Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());
        String bases64EncodedSecretKey = encodedBase64SecretKey(getSecretKey());

        return generateRefreshToken(subject, expiration, bases64EncodedSecretKey);
    }

    public String encodedBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject, Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject, Date expiration,
                                       String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        return calendar.getTime();
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
