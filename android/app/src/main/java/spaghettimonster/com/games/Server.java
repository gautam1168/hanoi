package spaghettimonster.com.games;

/**
 * Created by gauravgautam on 25/05/18.
 */
import android.content.Context;
import android.content.res.AssetManager;

import java.io.IOException;
import java.io.*;

public class Server extends NanoHTTPD {
    private static final int PORT = 8080;
    private AssetManager assetManager;
    public Server(AssetManager asm) throws IOException {
        super(PORT);
        assetManager = asm;
        start();
        System.out.println("Server started at port: " + PORT);
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();
        Response res = GenerateResponseUsingFile(uri);
        return res;
    }

    private Response GenerateResponseUsingFile(String path) {
        Response res;
        if (path.charAt(0) == '/') {
            path = path.substring(1);
        }
        String mimetype = "text/plain";
        String extension = path.split("\\.")[1];
        if (extension.equals("html")){
            mimetype = "text/html";
        } else if (extension.equals("js")) {
            mimetype = "text/javascript";
        } else if (extension.equals("png")) {
            mimetype = "image/png";
        }
        try {
            InputStream stream = assetManager.open(path);
            res = new Response(Response.Status.OK, mimetype, stream);
        } catch ( IOException e) {
            res = new Response(Response.Status.NOT_FOUND, mimetype, "File not found");
        }
        return res;
    }
}
