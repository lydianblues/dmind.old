<?php
/**
 * Single Event Template for Widgets
 *
 * This template is used to render single events for both the calendar and advanced
 * list widgets, facilitating a common appearance for each as standard.
 *
 * You can override this template in your own theme by creating a file at
 * [your-theme]/tribe-events/pro/widgets/modules/single-event.php
 *
 * @package TribeEventsCalendarPro
 *
 */

$mini_cal_event_atts = tribe_events_get_widget_event_atts();

$postDate = tribe_events_get_widget_event_post_date();

$organizer_ids = tribe_get_organizer_ids();
$multiple_organizers = count( $organizer_ids ) > 1;
?>

	<tr>
		<td>
			<div class="niroga-list-date">

				<span class="niroga-list-dayname"><?php echo apply_filters(
						'tribe-mini_helper_tribe_events_ajax_list_dayname',
						date_i18n( 'D', $postDate ), $postDate,
						$mini_cal_event_atts['class'] ); ?>
				</span>
				<span class="niroga-list-daynumber"><?php echo apply_filters(
						'tribe-mini_helper_tribe_events_ajax_list_daynumber',
						date_i18n( 'd', $postDate ), $postDate,
						$mini_cal_event_atts['class'] ); ?>
				</span>
			</div>
		</td>
		<td>
			<?php do_action( 'tribe_events_list_widget_before_the_event_title' ); ?>

				<div class="tribe-events-title">
					<a href="<?php echo esc_url( tribe_get_event_link() ); ?>"
					   rel="bookmark"><?php the_title(); ?>
					</a>
				</div>

			<?php do_action( 'tribe_events_list_widget_after_the_event_title' ); ?>
		</td>
		<?php do_action( 'tribe_events_list_widget_before_the_meta' ) ?>
		<td>
				<div class="tribe-events-duration">
					<?php echo tribe_get_start_date(null, false, "M j, Y" ) ?>
				</div>
		</td>
		<td>
			<?php if ( isset( $city ) && $city && tribe_get_city() != '' ): ?>
				<span class="tribe-events-locality"><?php echo tribe_get_city(); ?></span>
			<?php endif ?>
		</td>
		<td>
			<?php if ( isset( $organizer ) && $organizer && ! empty( $organizer_ids ) ): ?>
				<span class="tribe-events-organizer">
					<?php
					$organizer_links = array();
					foreach ( $organizer_ids as $organizer_id ) {
						if ( ! $organizer_id ) {
							continue;
						}

						$organizer_links[] = tribe_get_organizer_link( $organizer_id, true );
					}// end foreach

					$and = _x( 'and', 'list separator for final two elements', 'tribe-events-calendar-pro' );
					if ( 1 == count( $organizer_links ) ) {
						echo $organizer_links[0];
					}// end if
					elseif ( 2 == count( $organizer_links ) ) {
						echo $organizer_links[0] . ' ' . esc_html( $and ) . ' ' . $organizer_links[1];
					}// end elseif
					else {
						$last_organizer = array_pop( $organizer_links );

						echo implode( ', ', $organizer_links );
						echo esc_html( ', ' . $and . ' ' );
						echo $last_organizer;
					}// end else
					?>
				</span>
			<?php endif ?>

		</td>
		<td>
			<button class="niroga-register">Register</button>
		</td>
	</tr>


</div>

