package spaghettimonster.com.games;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

import java.io.IOException;

public class Hanoi extends AppCompatActivity {

    private WebView webView;
    private Server server;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);
        webView.getSettings().setJavaScriptEnabled(true);
        try {
            server = new Server(getAssets());
            webView.loadUrl("http://localhost:8080/index.html");
        } catch (IOException e) {
            LoadWebContent();
        }


    }

    private void LoadWebContent() {
        webView.loadData("<html><body>Server did not start.</body></html>", "text/html", null);
    }
}
