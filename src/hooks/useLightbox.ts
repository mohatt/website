import { useEffect, useState } from 'react'
import type { PhotoSwipeOptions } from 'photoswipe'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/photoswipe.css'

export interface UseLightboxProps extends PhotoSwipeOptions {}

/**
 * Handles photoswipe lightbox initialization.
 */
export function useLightbox(
  props?: UseLightboxProps,
  onInit?: (instance: PhotoSwipeLightbox) => void,
) {
  const [instance, setInstance] = useState<PhotoSwipeLightbox>()

  useEffect(() => {
    const instance = new PhotoSwipeLightbox({
      pswpModule: async () => await import('photoswipe'),
      ...props,
    })
    if (onInit) {
      onInit(instance)
    }
    instance.init()
    setInstance(instance)
    return () => {
      instance.destroy()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return instance
}
