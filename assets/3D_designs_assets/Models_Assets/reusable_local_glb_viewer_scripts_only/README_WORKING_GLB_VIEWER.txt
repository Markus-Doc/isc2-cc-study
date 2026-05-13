WORKING LOCAL GLB VIEWER PACK
=============================

What this is
------------
This pack lets you view GLB files in a browser without Blender.
It starts a tiny local server on 127.0.0.1, then opens the viewer page through http://localhost.

Why this fixes the old problem
------------------------------
Do not double click the HTML file directly.
Most browsers do not reliably load GLB models from file:// paths.
Use Launch_GLB_Viewer.cmd so the model is served over local HTTP.

Included files
--------------
- cyber_tiny_planet_lively_full.glb
- Launch_GLB_Viewer.cmd
- Launch_GLB_Viewer.ps1
- Choose_GLB_File.cmd
- Choose_GLB_File.ps1
- Start_Local_GLB_Server.ps1
- Stop_GLB_Viewer_Server.cmd
- Stop_GLB_Viewer_Server.ps1
- glb_viewer.html

Normal use
----------
1. Extract the ZIP.
2. Double click Launch_GLB_Viewer.cmd.
3. Your browser should open the model.
4. Keep the small PowerShell server window running while viewing.
5. Run Stop_GLB_Viewer_Server.cmd when finished.

Using it for future GLB renders
-------------------------------
Option A:
Put a new .glb file in the same folder as these scripts.
Double click Launch_GLB_Viewer.cmd.
It will open cyber_tiny_planet_lively_full.glb if present, otherwise it opens the newest .glb in the folder.

Option B:
Double click Choose_GLB_File.cmd.
Pick any .glb file from any folder.
The script will serve that file's folder locally and open it in the viewer.

Internet requirement
--------------------
The viewer loads Google's model-viewer browser component from a CDN.
You need internet access unless you later replace that dependency with a locally saved copy of model-viewer.

Troubleshooting
---------------
If nothing opens:
- Open the _viewer_logs folder.
- Read the newest launch_*.log and server_*.log files.
- Make sure PowerShell is allowed to run local scripts through the CMD launcher.
- Make sure the GLB file is not still inside a ZIP.
- Make sure you used the CMD launcher and not the HTML file.

Controls
--------
- Drag to orbit.
- Scroll to zoom.
- Right-click drag to pan.
- Use the viewer buttons to reset camera or toggle auto-rotate.
