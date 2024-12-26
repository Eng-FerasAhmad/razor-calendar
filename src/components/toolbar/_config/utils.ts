import { ToolbarConfig } from 'types/toolbarConfig';

export function mergeToolbarConfig(
    config: ToolbarConfig,
    userConfig: Partial<ToolbarConfig>
): ToolbarConfig {
    return {
        ...config,
        ...userConfig,
    };
}
