import { animated, useSpring } from "react-spring";

const CountUpNumber = ({ n, style, prefix, postfix }) => {
  const { number } = useSpring({
    from: {
      number: 0,
    },
    number: n,
    delay: 200,
    config: {
      mass: 1,
      tension: 20,
      friction: 10,
    },
  });

  return (
    <div className="flex gap-3 justify-center">
      <p className={style}>{prefix}</p>
      <animated.div className={style}>{number.to(n => n.toFixed(0))}</animated.div>
      <p className={style}>{postfix}</p>
    </div>
  );
};

export default CountUpNumber;
