use strict;
use warnings;

use Data::Dumper;

use Parser;
use LogViewer;

my $parser = Parser->new( filename => '../sample_data/large_log.ltsv' );
my $viewer = LogViewer->new($parser->parse);
$viewer->status_by_page;
