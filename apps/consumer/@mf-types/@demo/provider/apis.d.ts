
    export type RemoteKeys = '@demo/provider/button' | '@demo/provider/switch';
    type PackageType<T> = T extends '@demo/provider/switch' ? typeof import('@demo/provider/switch') :T extends '@demo/provider/button' ? typeof import('@demo/provider/button') :any;