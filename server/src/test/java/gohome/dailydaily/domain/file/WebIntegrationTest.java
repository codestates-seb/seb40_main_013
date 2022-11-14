package gohome.dailydaily.domain.file;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.net.URI;

import static java.lang.String.format;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class WebIntegrationTest {

    @LocalServerPort
    private int port;

    protected TestRestTemplate client = new TestRestTemplate();

    protected URI get(String path) {
        return URI.create(format("http://localhost:%d%s", port, path));
    }
}
