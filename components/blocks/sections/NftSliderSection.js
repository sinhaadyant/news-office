import NftSlider from '@/components/slider/NftSlider';
import Marquee from 'react-fast-marquee';

export default function NftSliderSection({ blockData }) {
  return (
    <section
      className='slider__area slider__style-two fix white-bg'
      style={{ backgroundImage: 'url("/assets/img/bg/banner_bg.jpg")' }}
    >
      <div className='container'>
        <div className='slider-active'>
          <NftSlider />
        </div>
        <div className='slider__marquee clearfix'>
          <div className='marquee_mode'>
            <Marquee className='js-marquee' pauseOnHover={true}>
              <h6 className='item'>
                BTC $20211.23 <span>+1.07%</span>
              </h6>
              <h6 className='item'>
                eth $1533.56 <span>+3.12%</span>
              </h6>
              <h6 className='item'>
                bnb $281.43 <span>+0.02%</span>
              </h6>
              <h6 className='item'>
                busd $1.00 <span>+0.01%</span>
              </h6>
              <h6 className='item minus'>
                xrp $0.33 <span>-2.62%</span>
              </h6>
              <h6 className='item'>
                ada $0.45 <span>+0.16%</span>
              </h6>
              <h6 className='item minus'>
                sol $31.54 <span>-1.14%</span>
              </h6>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
