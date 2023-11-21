import { productVariantAutoComplete } from './product-variant-auto-complete';

export default () => {
    const elements = document.querySelectorAll('.sylius-autocomplete.dropdown')
    productVariantAutoComplete(elements);
    initDropDownSyliusAutocomplete();
}


const initDropDownSyliusAutocomplete = () => {
  const targetNode       = document.querySelector("form div[data-form-collection='list']");
  if (!targetNode) return

  const config           = { childList: true };
  const observerRefresh  = new MutationObserver((e) => {
    e.forEach(({target}) => {
      var target = target.children.item((target.children.length -1));
      if (target) {
        const elements = target.querySelectorAll('.sylius-autocomplete.dropdown')
        productVariantAutoComplete(elements);
      }
    })
  });
  observerRefresh.observe(targetNode, config);
}
