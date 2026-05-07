import type { UserMeasurements, SizeRecommendation, Product } from '@/types';

export function calculateSizeRecommendation(
  measurements: UserMeasurements,
  product: Product
): SizeRecommendation {
  const { height, weight, bodyType } = measurements;
  const bmi = weight / Math.pow(height / 100, 2);

  let recommendedSize = '';
  let confidence = 0;
  let reason = '';

  if (product.category === 'tshirt' || product.category === 'shirt' || product.category === 'jacket') {
    if (bodyType === 'slim') {
      if (bmi < 18.5) {
        recommendedSize = 'XS';
        confidence = 85;
        reason = 'Based on your slim build and BMI, XS would provide the best fit.';
      } else if (bmi < 22) {
        recommendedSize = 'S';
        confidence = 90;
        reason = 'Your measurements indicate a small size for a comfortable, fitted look.';
      } else {
        recommendedSize = 'M';
        confidence = 85;
        reason = 'Medium size recommended for your body type and measurements.';
      }
    } else if (bodyType === 'regular') {
      if (bmi < 20) {
        recommendedSize = 'S';
        confidence = 85;
        reason = 'Small size suits your regular build and measurements.';
      } else if (bmi < 25) {
        recommendedSize = 'M';
        confidence = 95;
        reason = 'Medium is the ideal size for your body type and proportions.';
      } else if (bmi < 28) {
        recommendedSize = 'L';
        confidence = 90;
        reason = 'Large size will provide comfortable fit for your measurements.';
      } else {
        recommendedSize = 'XL';
        confidence = 85;
        reason = 'Extra large recommended for optimal comfort and fit.';
      }
    } else if (bodyType === 'athletic') {
      if (bmi < 23) {
        recommendedSize = 'M';
        confidence = 90;
        reason = 'Medium size accommodates athletic build with room for movement.';
      } else if (bmi < 27) {
        recommendedSize = 'L';
        confidence = 95;
        reason = 'Large size perfect for athletic build, providing comfort without restriction.';
      } else {
        recommendedSize = 'XL';
        confidence = 90;
        reason = 'Extra large suits your athletic frame and measurements.';
      }
    } else {
      if (bmi < 28) {
        recommendedSize = 'XL';
        confidence = 90;
        reason = 'Extra large provides comfortable fit for your body type.';
      } else if (bmi < 32) {
        recommendedSize = 'XXL';
        confidence = 95;
        reason = 'XXL size recommended for optimal comfort and fit.';
      } else {
        recommendedSize = 'XXL';
        confidence = 85;
        reason = 'XXL or larger recommended based on your measurements.';
      }
    }
  } else if (product.category === 'jeans') {
    const waistSize = Math.round(weight * 0.4 + (height - 100) * 0.3);
    
    if (bodyType === 'slim') {
      recommendedSize = `${Math.max(28, waistSize - 4)}`;
      confidence = 85;
      reason = `Waist size ${recommendedSize}" recommended for slim fit jeans.`;
    } else if (bodyType === 'regular') {
      recommendedSize = `${Math.max(28, waistSize)}`;
      confidence = 90;
      reason = `Waist size ${recommendedSize}" provides comfortable fit for your build.`;
    } else if (bodyType === 'athletic') {
      recommendedSize = `${Math.max(30, waistSize + 2)}`;
      confidence = 85;
      reason = `Waist size ${recommendedSize}" accommodates athletic thighs and build.`;
    } else {
      recommendedSize = `${Math.max(32, waistSize + 4)}`;
      confidence = 90;
      reason = `Waist size ${recommendedSize}" recommended for comfortable fit.`;
    }
  } else if (product.category === 'dress') {
    if (bodyType === 'slim') {
      if (bmi < 18.5) {
        recommendedSize = 'XS';
        confidence = 85;
        reason = 'Extra small size suits your slim figure perfectly.';
      } else {
        recommendedSize = 'S';
        confidence = 90;
        reason = 'Small size recommended for flattering fit on your frame.';
      }
    } else if (bodyType === 'regular') {
      if (bmi < 22) {
        recommendedSize = 'S';
        confidence = 85;
        reason = 'Small size provides elegant fit for your proportions.';
      } else if (bmi < 26) {
        recommendedSize = 'M';
        confidence = 95;
        reason = 'Medium is ideal for your body type and measurements.';
      } else {
        recommendedSize = 'L';
        confidence = 90;
        reason = 'Large size offers comfortable and flattering fit.';
      }
    } else if (bodyType === 'athletic') {
      if (bmi < 24) {
        recommendedSize = 'M';
        confidence = 90;
        reason = 'Medium accommodates athletic build with elegant drape.';
      } else {
        recommendedSize = 'L';
        confidence = 90;
        reason = 'Large size perfect for athletic frame with comfortable fit.';
      }
    } else {
      if (bmi < 28) {
        recommendedSize = 'L';
        confidence = 90;
        reason = 'Large size provides comfortable and flattering fit.';
      } else {
        recommendedSize = 'XL';
        confidence = 90;
        reason = 'Extra large recommended for optimal comfort and style.';
      }
    }
  }

  if (!product.sizes.includes(recommendedSize)) {
    const availableSizes = product.sizes;
    recommendedSize = availableSizes[Math.floor(availableSizes.length / 2)];
    confidence = 70;
    reason = `${recommendedSize} is the closest available size for your measurements.`;
  }

  return {
    size: recommendedSize,
    confidence,
    reason,
  };
}
