import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Comfortaa', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
			},
			colors: {
				// Playful Color Palette
				'soft-purple': 'rgb(var(--soft-purple) / <alpha-value>)',
				'pastel-pink': 'rgb(var(--pastel-pink) / <alpha-value>)',
				'electric-blue': 'rgb(var(--electric-blue) / <alpha-value>)',
				'soft-green': 'rgb(var(--soft-green) / <alpha-value>)',
				'warm-orange': 'rgb(var(--warm-orange) / <alpha-value>)',
				'soft-yellow': 'rgb(var(--soft-yellow) / <alpha-value>)',
				'lavender': 'rgb(var(--lavender) / <alpha-value>)',
				'mint': 'rgb(var(--mint) / <alpha-value>)',
				'coral': 'rgb(var(--coral) / <alpha-value>)',
				'sky': 'rgb(var(--sky) / <alpha-value>)',
				
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'pulse-glow': {
					'0%': {
						boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)'
					},
					'100%': {
						boxShadow: '0 0 30px rgba(147, 51, 234, 0.6)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'bounce-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.3)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.05)'
					},
					'70%': {
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				'unicorn-fly': {
					'0%': {
						transform: 'translateX(-100vw) translateY(50vh) rotate(0deg)',
						opacity: '0'
					},
					'20%': {
						opacity: '1'
					},
					'80%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(100vw) translateY(-50vh) rotate(360deg)',
						opacity: '0'
					}
				},
				'sparkle': {
					'0%, 100%': {
						opacity: '0',
						transform: 'scale(0) rotate(0deg)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1) rotate(180deg)'
					}
				},
				'streak-fire': {
					'from': {
						transform: 'scale(1) rotate(-5deg)'
					},
					'to': {
						transform: 'scale(1.1) rotate(5deg)'
					}
				},
				'motivational-pop': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.5) translateY(20px)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.1) translateY(-10px)'
					},
					'100%': {
						opacity: '0',
						transform: 'scale(1) translateY(-20px)'
					}
				},
				'rainbow-trail': {
					'0%': {
						left: '-100%'
					},
					'100%': {
						left: '100%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'slide-in': 'slide-in 0.5s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'gradient-shift': 'gradient-shift 3s ease infinite',
				'unicorn-fly': 'unicorn-fly 3s ease-in-out',
				'sparkle': 'sparkle 2s infinite',
				'streak-fire': 'streak-fire 1s ease-in-out infinite alternate',
				'motivational-pop': 'motivational-pop 2s ease-out',
				'rainbow-trail': 'rainbow-trail 2s infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
