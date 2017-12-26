import asyncPlugin from 'preact-cli-plugin-async'
import styledPlugin from 'preact-cli-plugin-styled-components'

export default (config, env, helpers) => {
  asyncPlugin(config)
  styledPlugin(config, env, helpers)
}
