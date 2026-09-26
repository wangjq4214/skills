# Requested plan preview

Use only for the preview branch in SKILL.md; previewing an existing plan does not require regenerating it.

1. Ensure `.grimoire/plans/viewer.html` matches [../assets/plan-viewer.html](../assets/plan-viewer.html).
2. Detect Python by trying `python` and then `py`.
3. When Python is available, reuse a confirmed server already serving `.grimoire/plans/`, or start `-m http.server` as a non-blocking background process bound to `127.0.0.1`. Start at port `8000` and choose another available port if needed.
4. Verify the HTTP endpoint responds, then open `http://127.0.0.1:PORT/viewer.html?plan=NNNN-title.md` when the environment supports opening a browser.
5. Report the preview URL and server PID or exact stop command.
6. If Python is unavailable or the server cannot start, offer `viewer.html` directly with its file picker and drag-and-drop fallback.

Completion: A verified loopback preview URL is available, or the direct viewer fallback and any preview limitation are reported. Preview failure does not invalidate the saved plan or block authorized execution.
