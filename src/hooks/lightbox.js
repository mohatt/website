import { useEffect, useState } from 'react'

/**
 * Handles photoswipe lightbox initialization and lazy loading.
 *
 * @param {object} options
 * @param {function?} onInit
 * @return {[object, string]}
 */
export default function useLightbox(options, onInit) {
  const [exports, setExports] = useState([])

  useEffect(() => {
    let instance
    Promise.all([
      import(/* webpackMode: "eager" */ 'photoswipe'),
      import(/* webpackMode: "eager" */ 'photoswipe/lightbox'),
      import(/* webpackMode: "eager" */ '!raw-loader!postcss-loader!photoswipe/photoswipe.css'),
    ]).then(([{ default: PhotoSwipe }, { default: PhotoSwipeLightbox }, { default: styles }]) => {
      instance = new PhotoSwipeLightbox({ pswpModule: PhotoSwipe, ...options })
      if (onInit) {
        onInit(instance)
      }
      instance.init()
      setExports([instance, styles])
    })
    return () => {
      instance?.destroy()
    }
  }, [])

  return exports
}
