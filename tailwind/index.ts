import { kebabCase } from "lodash";
import mapTokens from "../tokens/map.json";
import seedTokens from "../tokens/seed.json";

export function getMapToken(name: string) {
  return Object.entries(
    mapTokens[name as keyof typeof mapTokens] as Record<
      string,
      { $value: string }
    >
  ).reduce(
    (colors, [name, { $value }]) => ({
      ...colors,
      [kebabCase(name)]: `var(--${kebabCase($value.slice(1, -1))})`,
    }),
    {}
  );
}

export function seedsToCSSVars(name: string) {
  const values = Object.entries(
    seedTokens[name as keyof typeof seedTokens]
  ).flatMap(([key, value]) =>
    "$value" in value
      ? [[`${name}-${key}`, value.$value]]
      : Object.entries(value as Record<string, { $value: string }>).map(
          ([$key, { $value }]) => [`${name}-${key}-${$key}`, $value]
        )
  );

  return values.reduce(
    (total, [name, value]) => ({ ...total, [`--${kebabCase(name)}`]: value }),
    {}
  );
}
