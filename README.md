# IntraNest Extension

Open your team's IntraNest links from the Chrome toolbar. The extension connects directly to the server computer on your intranet.

**Current version:** `0.1.0`  
**Available languages:** [한국어](README.ko.md)

## Get started

1. Ask your IntraNest server host for the server address and team access key.
2. Download the latest ZIP from [GitHub Releases](https://github.com/hyuck0221/intranest-extensions/releases) and extract it.
3. In Chrome, open `chrome://extensions`, turn on **Developer mode**, and choose **Load unpacked**. Select the extracted IntraNest folder.
4. Open IntraNest from the Chrome toolbar, enter the server address and access key, then connect.
5. Allow Chrome to access the server address you entered. The extension requests that exact server origin.

## Use shared links

The popup opens on your team's shared links. Select a link to open it in a new tab, or choose **Add link** to share another one. Links and their titles are stored on your IntraNest server, where the team can manage them together.

The extension keeps server settings in this Chrome profile so it can reconnect. It does not load or modify other web pages. Chat and shared files are available in the IntraNest Admin page.

## Update the extension

In the extension's **Settings**, choose **Check for updates**. Chrome asks separately for permission to check the public GitHub release feed. When a newer version is found, the popup offers **Download update** and **Later**. Download the ZIP, extract it, then replace the old unpacked folder from `chrome://extensions`.

Chrome does not automatically install ZIP updates for developer-loaded extensions. Extract the update into the same folder you loaded originally, preserving its path, then choose **Reload** on `chrome://extensions`. Chrome keeps the connection settings for that extension folder.

## Your information

The server address and team key stay in this Chrome profile. Shared links are sent to the server you configured. Release checks contact GitHub and do not include your team content. See the [privacy page](https://github.com/hyuck0221/intranest-web/blob/master/public/privacy.html) for details.

## Release versions

The root `version` file controls this project's version and must match `manifest.json`. A push to `master` creates a GitHub Release with a ZIP only when the version is newer than the latest published release. The server, web, and extension versions are independent.
