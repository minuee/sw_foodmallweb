import React, { useCallback, useEffect, useRef,useState } from 'react'
import { EmblaCarouselType,EmblaEventType,EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay';

//opacity
const TWEEN_FACTOR_BASE = 0.82;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  isScrolling? : boolean
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const [slidesInView, setSlidesInView] = React.useState<number[]>([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 3000 })
      ])
    const tweenFactor = useRef(0)
  
    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
        setScrollProgress(progress * 100)
    }, [])

    useEffect(() => {
        if (!emblaApi) return
    
        onScroll(emblaApi)
        emblaApi.on('reInit', onScroll)
        emblaApi.on('scroll', onScroll)
    }, [emblaApi, onScroll])

      

    useEffect(() => {
        
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return
    
        setIsPlaying(autoplay.isPlaying())
        emblaApi
          .on('autoplay:play', () => setIsPlaying(true))
          .on('autoplay:stop', () => setIsPlaying(false))
          .on('reInit', () => setIsPlaying(false))
    }, [emblaApi])


    const toggleAutoplay = (isScrolling:boolean = true) => {
        try{

            const autoplay = emblaApi?.plugins()?.autoplay;
            console.log("toggleAutoplay",autoplay?.isPlaying(),isScrolling)
            if (!autoplay ) return;
            const playOrStop = isScrolling ? autoplay?.play : autoplay?.stop;
            playOrStop();
        }catch(e){
        }
    }

    useEffect(() => {
        toggleAutoplay(props.isScrolling);
    }, [props.isScrolling])


    const tweenOpacity = useCallback( (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
        const engine = emblaApi.internalEngine()
        const scrollProgress = emblaApi.scrollProgress()
        const slidesInView = emblaApi.slidesInView()
        const isScrollEvent = eventName === 'scroll';

        emblaApi.scrollSnapList().forEach((scrollSnap:any, snapIndex:number) => {
            let diffToTarget = scrollSnap - scrollProgress
            const slidesInSnap = engine.slideRegistry[snapIndex]

            slidesInSnap.forEach((slideIndex:number) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem:any) => {
                        const target = loopItem.target()

                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target)

                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress)
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress)
                            }
                        }
                    })
                }

            const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
            const opacity = numberWithinRange(tweenValue, 0, 1).toString()
            emblaApi.slideNodes()[slideIndex].style.opacity = opacity
            })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
  }, [emblaApi, tweenOpacity])

  return (
    <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
            {
                slides.map((index) => (
                    <div className="embla__slide" key={index}>
                        <img
                            className="embla__slide__img"
                            src={`https://picsum.photos/600/350?v=${index}`}
                            alt="Your alt text"
                        />
                    </div>
                ))
            }
            </div>
        </div>
        {/* <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? 'Stop' : 'Start'}
        </button> */}
        <div className="embla__progress">
            <div
                className="embla__progress__bar"
                style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
            />
        </div>
    </div>
  )
}

export default EmblaCarousel
