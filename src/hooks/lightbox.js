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
      import(/* webpackMode: "eager" */ 'photoswipe/dist/photoswipe-lightbox.esm.js'),
      import(/* webpackMode: "eager" */ 'photoswipe/dist/photoswipe.esm.js'),
      import(/* webpackMode: "eager" */ '!raw-loader!postcss-loader!photoswipe/dist/photoswipe.css'),
    ]).then(([{ default: PhotoSwipeLightbox }, { default: PhotoSwipe }, { default: styles }]) => {
      instance = new PhotoSwipeLightbox(Object.assign({ pswpModule: PhotoSwipe }, options))
      if (onInit) {
        onInit(instance)
      }
      instance.init()
      setExports([instance, styles])
    })
    return () => instance.destroy()
  }, [])

  return exports
}
