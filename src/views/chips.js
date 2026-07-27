/**
 * Rendu des puces de sélection, partagé par les secteurs, les mots-clés et les tons.
 */

/** @typedef {{ id: string, emoji: string, featured?: boolean }} ChipItem */

/**
 * @param {{ id: string, emoji: string, text: string, title?: string, hidden?: boolean }} chip
 * @param {string} attr Attribut `data-` porteur de l'identifiant.
 * @returns {string}
 */
export function renderChip({ id, emoji, text, title, hidden }, attr) {
  return `
    <button
      type="button"
      class="chip-btn${hidden ? ' chip-extra chip-hidden' : ''}"
      ${attr}="${id}"
      aria-pressed="false"
      ${title ? `title="${title}"` : ''}
    >
      <span aria-hidden="true">${emoji}</span>
      <span>${text}</span>
    </button>
  `;
}

/**
 * `collapsible` place les items non `featured` en fin de liste et les masque
 * derrière la bascule "Voir plus".
 * @template {ChipItem} T
 * @param {T[]} items
 * @param {string} attr
 * @param {{ text: (item: T) => string, title?: (item: T) => string, collapsible?: boolean }} options
 * @returns {string}
 */
export function renderChipGroup(items, attr, { text, title, collapsible = false }) {
  const ordered = collapsible
    ? [...items.filter((item) => item.featured), ...items.filter((item) => !item.featured)]
    : items;

  return ordered
    .map((item) =>
      renderChip(
        {
          id: item.id,
          emoji: item.emoji,
          text: text(item),
          title: title?.(item),
          hidden: collapsible && !item.featured,
        },
        attr,
      ),
    )
    .join('');
}

/**
 * Nombre d'items repliés sous "Voir plus".
 * @param {ChipItem[]} items
 * @returns {number}
 */
export function countCollapsed(items) {
  return items.filter((item) => !item.featured).length;
}
