import type { FederationRuntimePlugin } from "@module-federation/enhanced/runtime";

export const customSharedPlugin: () => FederationRuntimePlugin = function () {
  return {
    name: "custom-shared-plugin",
    beforeInit(args) {
      console.log("beforeInit: ", args);
      return args;
    },
    async beforeLoadShare(args) {
      console.log("beforeloadShare:", args);
      return args;
    },
    resolveShare(args) {
      console.log("resolveShare", args);
      const { shareScopeMap, scope, pkgName, version } = args;

      if (pkgName !== "@emotion/styled") {
        return args;
      }

      // set lib
      args.resolver = function () {
        shareScopeMap[scope][pkgName][version] = {
          lib: () => {
            const emotionStyle = __webpack_require__(
              "webpack/sharing/consume/default/@emotion/styled/@emotion/styled?d6d1"
            );
            return __webpack_require__.n(emotionStyle);
          },
          loaded: true,
          loading: Promise.resolve(() => {
            const emotionStyle = __webpack_require__(
              "webpack/sharing/consume/default/@emotion/styled/@emotion/styled?d6d1"
            );
            return __webpack_require__.n(emotionStyle);
          }),
        }; // Manually replace the local share scope with the desired module
        return shareScopeMap[scope][pkgName][version];
      };

      // set get
      //   args.resolver = function () {
      //     shareScopeMap[scope][pkgName][version] = {
      //       get: async ()=>()=>window.React,
      //     }; // Manually replace the local share scope with the desired module
      //     return shareScopeMap[scope][pkgName][version];
      //   };
      return args;
    },
  };
};
