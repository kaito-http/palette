import Dialog, { DialogOverlay, DialogContent } from "@reach/dialog";
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { CSSProperties, useState } from "react";
import { UseTransitionProps } from "react-spring";

export const AnimatedDialogOverlay = animated(DialogOverlay);
export const AnimatedDialogContent = animated(DialogContent);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const transitions = useTransition(isOpen, {
    from: {
      opacity: 1,
      scale: 0.9,
    },
    enter: {
      opacity: 1,
      scale: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  return (
    <div>
      <Dialog isOpen={isOpen} onDismiss={close}>
        {transitions((styles) => {
          return (
            <AnimatedDialogOverlay style={{ position: "absolute", opacity: styles.opacity }}>
              <AnimatedDialogContent style={styles}>
                <button onClick={() => setIsOpen(false)}>Close Dialog</button>
                <p>React Spring makes it too easy!</p>
                <input type="text" />
                <br />
                <input type="text" />
                <button>Ayyyyyy</button>
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          );
        })}
      </Dialog>

      <button onClick={open}>hi</button>
    </div>
  );
}
