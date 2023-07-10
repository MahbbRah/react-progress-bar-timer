import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ButtonBase, Box, Typography, Slide, alpha } from '@mui/material';
import { blue } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';
import { keyframes } from '@emotion/react';

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var Direction;

(function (Direction) {
  Direction["Left"] = "left";
  Direction["Right"] = "right";
})(Direction || (Direction = {}));

var Variant;

(function (Variant) {
  Variant["Fill"] = "fill";
  Variant["Empty"] = "empty";
})(Variant || (Variant = {}));

var useTimer = function useTimer(_ref) {
  var duration = _ref.duration,
      _ref$onTick = _ref.onTick,
      onTick = _ref$onTick === void 0 ? function () {} : _ref$onTick,
      _ref$onFinish = _ref.onFinish,
      onFinish = _ref$onFinish === void 0 ? function () {} : _ref$onFinish;

  var _useState = useState(duration),
      time = _useState[0],
      setTime = _useState[1];

  var _useState2 = useState(),
      timer = _useState2[0],
      setTimer = _useState2[1];

  var isRunning = Boolean(timer && time);
  var callbackRef = useRef();
  /**
   * Update callback ref on changes to callback props
   * to allow changes to reflect within setInterval's callback.
   */

  useEffect(function () {
    callbackRef.current = {
      onTick: onTick,
      onFinish: onFinish
    };
  }, [onTick, onFinish]);
  /**
   * Starts a stopped timer.
   */

  var start = function start() {
    setTime(duration);
    var timer = setInterval(function () {
      var _callbackRef$current;

      (_callbackRef$current = callbackRef.current) == null ? void 0 : _callbackRef$current.onTick == null ? void 0 : _callbackRef$current.onTick();
      setTime(function (prevTime) {
        var updatedTime = prevTime - 1;

        if (!updatedTime) {
          var _callbackRef$current2;

          clearInterval(timer);
          (_callbackRef$current2 = callbackRef.current) == null ? void 0 : _callbackRef$current2.onFinish == null ? void 0 : _callbackRef$current2.onFinish();
        }

        return updatedTime;
      });
    }, 1000);
    setTimer(timer);
  };
  /**
   * Stops a running timer.
   */


  var stop = function stop() {
    clearInterval(timer);
    setTimer(undefined);
  };
  /**
   * Restarts a running or finished timer.
   */


  var restart = function restart() {
    setTime(0);
    stop();
  };
  /**
   * Restarts the timer if time is 0.
   * This allows UI to reset visually prior to restarting.
   */


  var handleRestart = function handleRestart() {
    if (time) {
      return;
    }

    start();
  };

  useEffect(handleRestart, [timer]);
  /**
   * Cleanup by clearing interval on unmount.
   */

  useEffect(function () {
    return function () {
      return clearInterval(timer);
    };
  }, []);
  return {
    time: time,
    timer: timer,
    isRunning: isRunning,
    start: start,
    stop: stop,
    restart: restart
  };
};

var _templateObject;

var getRadius = function getRadius(rounded) {
  return rounded ? 4 : 0;
};

var useStyles = /*#__PURE__*/makeStyles()(function (_theme, _ref) {
  var color = _ref.color,
      rootRounded = _ref.rootRounded,
      barRounded = _ref.barRounded;
  return {
    root: {
      width: '100%',
      borderRadius: getRadius(rootRounded)
    },
    progressContainer: {
      flex: 1,
      position: 'relative',
      overflowX: 'hidden',
      borderRadius: getRadius(rootRounded),
      backgroundColor: alpha(color, 0.4)
    },
    progress: {
      zIndex: 1,
      inset: 0,
      position: 'absolute',
      transformOrigin: 'left center',
      backgroundColor: color,
      borderRadius: getRadius(barRounded)
    },
    textContainer: {
      boxSizing: 'border-box',
      position: 'relative',
      height: '4em',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      margin: 8,
      overflowY: 'hidden',
      fontWeight: 500
    },
    label: {
      lineHeight: 'normal',
      letterSpacing: '0.0285em',
      fontWeight: 'inherit',
      fontSize: '0.9em',
      transition: 'transform 300ms cubic-bezier(0, 0, 0.2, 1) 0ms'
    },
    time: {
      fontWeight: 'inherit',
      fontSize: '2em',
      lineHeight: 1
    },
    finished: {
      animation: keyframes(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n        0% {\n          opacity: 0.8;\n          background-color: orangered;\n        }\n        "]))) + " 1s 5"
    }
  };
});

var padTime = function padTime(num) {
  return ("" + num).padStart(2, '0');
};

var ProgressTimer = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var _cx, _cx2;

  var _ref2$direction = _ref2.direction,
      direction = _ref2$direction === void 0 ? Direction.Right : _ref2$direction,
      _ref2$variant = _ref2.variant,
      variant = _ref2$variant === void 0 ? Variant.Fill : _ref2$variant,
      _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? blue[700] : _ref2$color,
      _ref2$fontColor = _ref2.fontColor,
      fontColor = _ref2$fontColor === void 0 ? '#ffffffd9' : _ref2$fontColor,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 60 : _ref2$duration,
      _ref2$label = _ref2.label,
      label = _ref2$label === void 0 ? '' : _ref2$label,
      _ref2$buttonText = _ref2.buttonText,
      buttonText = _ref2$buttonText === void 0 ? '' : _ref2$buttonText,
      _ref2$classes = _ref2.classes,
      classes = _ref2$classes === void 0 ? {} : _ref2$classes,
      fontSize = _ref2.fontSize,
      _ref2$showDuration = _ref2.showDuration,
      showDuration = _ref2$showDuration === void 0 ? false : _ref2$showDuration,
      _ref2$rootRounded = _ref2.rootRounded,
      rootRounded = _ref2$rootRounded === void 0 ? true : _ref2$rootRounded,
      _ref2$barRounded = _ref2.barRounded,
      barRounded = _ref2$barRounded === void 0 ? false : _ref2$barRounded,
      started = _ref2.started,
      _ref2$formatWithDays = _ref2.formatWithDays,
      formatWithDays = _ref2$formatWithDays === void 0 ? true : _ref2$formatWithDays,
      _ref2$onFinish = _ref2.onFinish,
      _onFinish = _ref2$onFinish === void 0 ? function () {} : _ref2$onFinish;

  var _useStyles = useStyles({
    color: color,
    rootRounded: rootRounded,
    barRounded: barRounded
  }, {
    props: {
      classes: classes
    }
  }),
      styles = _useStyles.classes,
      cx = _useStyles.cx;

  var _useTimer = useTimer({
    duration: duration,
    onFinish: function onFinish() {
      return _onFinish(label || buttonText);
    }
  }),
      time = _useTimer.time,
      timer = _useTimer.timer,
      isRunning = _useTimer.isRunning,
      start = _useTimer.start,
      stop = _useTimer.stop,
      restart = _useTimer.restart;
  /**
   * Controls timer via functions instead of "started" prop.
   */


  useImperativeHandle(ref, function () {
    return {
      start: start,
      stop: stop,
      restart: restart
    };
  });
  /**
   * Formats the time to mm:ss.
   *
   * @returns {string} the formatted time
   */

  var formatTime = function formatTime() {
    return padTime(Math.floor(time / 60)) + ":" + padTime(time % 60);
  };
  /**
   * Gets the sign of the css translation that
   * determines if the bar moves left or right.
   *
   * @returns {string} the sign
   */


  var getSign = function getSign() {
    var negativeDirection = timer ? Direction.Left : Direction.Right;
    return direction === negativeDirection ? '-' : '';
  };
  /**
   * Builds the progress transformation used
   * to move the progress bar left or right.
   *
   * @returns {string} the x translation css
   */


  var buildProgressTransformation = function buildProgressTransformation() {
    var xPercentage = Boolean(timer) === (variant === Variant.Fill) ? '0%' : '100%';
    return "translateX(" + getSign() + xPercentage + ")";
  };
  /**
   * Controls timer via "started" prop.
   */


  var handleStartedChange = function handleStartedChange() {
    if (started == null) {
      return;
    }

    if (started) {
      if (timer) {
        restart();
      } else {
        start();
      }
    } else {
      stop();
    }
  };

  function formatTimedhms(seconds) {
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  useEffect(handleStartedChange, [started]);
  return jsx(ButtonBase, {
    className: styles.root,
    "aria-label": label,
    onClick: timer ? stop : start,
    children: jsxs("div", {
      className: cx(styles.progressContainer, (_cx = {}, _cx[styles.finished] = !time && variant === Variant.Empty, _cx)),
      children: [jsxs(Box, {
        className: styles.textContainer,
        fontSize: fontSize,
        color: fontColor,
        children: [(label || buttonText && !timer || !time) && jsx(Typography, {
          className: styles.label,
          sx: {
            transform: isRunning || showDuration ? undefined : 'scale(1.86)'
          },
          children: !isRunning && buttonText ? buttonText : label
        }), jsx(Slide, {
          direction: "up",
          timeout: {
            enter: 100,
            exit: 70
          },
          "in": showDuration || isRunning,
          mountOnEnter: true,
          unmountOnExit: true,
          children: jsx(Typography, {
            className: styles.time,
            children: formatWithDays ? formatTimedhms(time) : formatTime()
          })
        })]
      }), jsx("span", {
        className: cx(styles.progress, (_cx2 = {}, _cx2[styles.finished] = !time && variant === Variant.Fill, _cx2)),
        style: {
          transform: buildProgressTransformation(),
          transition: timer ? "transform " + duration + "s linear 0s" : undefined
        }
      })]
    })
  });
});

export default ProgressTimer;
export { Direction, Variant, useTimer };
//# sourceMappingURL=react-progress-bar-timer.esm.js.map
