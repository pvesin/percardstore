import $ from 'jquery';
import './product-variant-auto-complete';

export default () => {
    $('.sylius-autocomplete.dropdown').productVariantAutoComplete();
    initDropDownSyliusAutocomplete();
}


const initDropDownSyliusAutocomplete = () => {
  const targetNode       = document.querySelector("form div[data-form-collection='list']");
  if (!targetNode) return

  const config           = { childList: true };
  const observerRefresh  = new MutationObserver((e) => {
    e.forEach(({target}) => {
      var target = target.children.item((target.children.length -1));
      $(target).find('.sylius-autocomplete.dropdown').productVariantAutoComplete();
    })
  });
  observerRefresh.observe(targetNode, config);
}
