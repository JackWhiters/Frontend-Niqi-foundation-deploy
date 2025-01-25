import { AnimatePresence, motion } from "framer-motion";
// import PropTypes from "prop-types"; // For prop validation

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  transition = { duration: 1 },
  className = "",
  show = true, // Whether to render the children
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={keyValue}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Prop validation for better debugging
// AnimationWrapper.propTypes = {
//   children: PropTypes.node.isRequired,
//   keyValue: PropTypes.string, // Use `key` only when dynamic animations are required
//   initial: PropTypes.object,
//   animate: PropTypes.object,
//   exit: PropTypes.object,
//   transition: PropTypes.object,
//   className: PropTypes.string,
//   show: PropTypes.bool,
// };

// Default export for reusability
export default AnimationWrapper;
