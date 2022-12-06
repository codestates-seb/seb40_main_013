package gohome.dailydaily.global.error.logging;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ServerErrorLogging {

    private final DiscordWebhook webhook;

    public void sendToDiscord(HttpServletRequest request, Exception e, Long memberId) throws IOException {
        webhook.setContent(e.getMessage());

        DiscordWebhook.EmbedObject errorObject = new DiscordWebhook.EmbedObject();

        String parameterMap = request.getParameterMap().entrySet().stream()
                .map(entry -> String.join("=", entry.getKey(), Arrays.toString(entry.getValue())))
                .collect(Collectors.joining(", "));

        webhook.addEmbed(errorObject
                .addField("URI", request.getRequestURI(), false)
                .addField("ParameterMap", parameterMap, false)
                .addField("유저 아이디", String.valueOf(memberId), false)
                .addField("IP", getIp(request), false)
                .addField("예외 타입", String.valueOf(e.getClass()), false)
                .addField("에러 메시지", e.getMessage(), false)
                .addField("발생 시간", String.valueOf(LocalDateTime.now()), false));

        webhook.execute();
    }

    public String getIp(HttpServletRequest request) {
        List<String> headers = List.of(
                "X-Forwarded-For", "Proxy-Client-IP", "WL-Proxy-Client-IP", "HTTP_CLIENT_IP",
                "HTTP_X_FORWARDED_FOR", "HTTP_X_FORWARDED", "HTTP_FORWARDED_FOR", "HTTP_FORWARDED",
                "X-Real-IP", "X-RealIP", "REMOTE_ADDR", "HTTP_VIA", "IPV6_ADR");

        String ip = request.getRemoteAddr();

        for (String header : headers) {
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                break;
            }
            ip = request.getHeader(header);
        }

        return ip;
    }
}
