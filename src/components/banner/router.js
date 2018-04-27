import {
  INDEX
} from './_consts/routerCfg'
import asyncComponent from '@/components/_common/asyncComponent'

export default [{
  ...INDEX,
  component: asyncComponent(() => import('./index'))
}]
