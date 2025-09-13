import { useEffect, useState } from 'react'
import PhotoSwipe, { PhotoSwipeOptions } from 'photoswipe'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/photoswipe.css'

/**
 * Handles photoswipe lightbox initialization.
 */
export function useLightbox(
  options?: PhotoSwipeOptions,
  onInit?: (instance: PhotoSwipeLightbox) => void,
) {
  const [instance, setInstance] = useState<PhotoSwipeLightbox>()

  useEffect(() => {
    const instance = new PhotoSwipeLightbox({ pswpModule: PhotoSwipe, ...options })
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
