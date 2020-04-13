import Complex from 'complex.js';


  function power_of_2(n) {
    if (typeof n !== 'number' && n <= 0)
      return false;

    return n && (n & (n - 1)) === 0;
  }

  function generate_power2_length(n) {
    let i = 1;
    let length = Math.pow(2,i);
    while ( length < n ) {
      i++;
      length = Math.pow(2,i);
    }

    return length;
  }

 export function dft(x) {
    const N = x.length;

    // Initialize an array with N elements, filled with 0s
    return Array(N)
      .fill(new Complex(0, 0))
      .map((temp, i) => {
        // Reduce x into the sum of x_k * exp(-2*sqrt(-1)*pi*i*k/N)
        return x.reduce((a, b, k) => {
          return a.add(b.mul(new Complex(0, (-2 * Math.PI * i * k) / N).exp()));
        }, new Complex(0, 0)); // Start accumulating from 0
      });
  }

 export function FFT_cooley_tukey(x) {
   const N = x.length;
   const half = Math.floor(N / 2);
   if (N <= 1) {
     return x;
   }

   // Extract even and odd indexed elements with remainder mod 2
   const evens = FFT_cooley_tukey(x.filter((_, idx) => !(idx % 2)));
   const odds = FFT_cooley_tukey(x.filter((_, idx) => idx % 2));

   // Fill an array with null values
   let temp = Array(N).fill(null);

   for (let i = 0; i < half; i++) {
     const arg = odds[i].mul(new Complex(0, (-2 * Math.PI * i) / N).exp());

     temp[i] = evens[i].add(arg);
     temp[i + half] = evens[i].sub(arg);
   }

    return temp;
  }


 export function generate_transformed_data(x) {
   const original_length = x.length;
   if ( original_length <= 0) {
     return x;
   }

   let appropriate_arr = x;

   if ( !power_of_2(original_length) ) {
     const last_element = x[ original_length - 1 ];
     appropriate_arr.length = generate_power2_length(original_length);
     appropriate_arr.fill( last_element , original_length );
   }

   let fourier_data = FFT_cooley_tukey(appropriate_arr);

   let result = [];
   for (var i = 0; i < fourier_data.length; i++) {
     const re = (fourier_data[i].re / (fourier_data.length * 1.5));
     const im = (fourier_data[i].im / (fourier_data.length * 1.5));
     const freq = i;
     const amp = Math.sqrt( re*re + im*im );
     const angle = Math.atan2(im,re);
     result[i] = {re,im,freq,amp,angle};
   }

   return result.sort( (a,b) => b.amp - a.amp );
 }
