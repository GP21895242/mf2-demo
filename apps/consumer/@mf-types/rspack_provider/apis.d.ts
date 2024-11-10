
    export type RemoteKeys = 'rspack_provider/button' | 'rspack_provider/switch';
    type PackageType<T> = T extends 'rspack_provider/switch' ? typeof import('rspack_provider/switch') :T extends 'rspack_provider/button' ? typeof import('rspack_provider/button') :any;